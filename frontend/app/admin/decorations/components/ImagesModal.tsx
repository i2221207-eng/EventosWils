'use client'

import React, { useState, useEffect } from "react";

interface Decoration {
  id: number;
  name: string;
}

interface Image {
  id: number;
  image_url: string;
  is_main: boolean;
}

interface ImagesModalProps {
  decoration: Decoration;
  onClose: () => void;
}

export default function ImagesModal({ decoration, onClose }: ImagesModalProps) {

  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/decorations/${decoration.id}/images`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if (!res.ok) {
          console.error("Error cargando imágenes");
          setImages([]);
          return;
        }

        const data = await res.json();
        setImages(Array.isArray(data) ? data : []);

      } catch (error) {
        console.error(error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [decoration.id]);

  const handleDeleteImage = async (imageId: number) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/decorations/images/${imageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (res.ok) {
        setImages(prev => prev.filter(img => img.id !== imageId));
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-full max-w-2xl shadow-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Imágenes de {decoration.name}
        </h2>

        <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto">

          {loading && <p>Cargando...</p>}

          {!loading && images.length === 0 && (
            <p>No hay imágenes</p>
          )}

          {images.map((img) => (
            <div key={img.id} className="relative">
              <img
                src={`http://localhost:4000${img.image_url}`}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <button
                onClick={() => handleDeleteImage(img.id)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs"
              >
                ✕
              </button>
            </div>
          ))}

        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-5 py-2 rounded-lg"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
