import { CheckCircle, XCircle } from 'lucide-react';
import ReactDOM from 'react-dom/client';
import React from 'react';

const SweetAlert = ({
  type = 'success', // 'success' | 'error'
  title,
  subtitle,
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  const isSuccess = type === 'success';

  const icon = isSuccess ? (
    <CheckCircle className="text-green-600 mx-auto" size={48} />
  ) : (
    <XCircle className="text-red-600 mx-auto" size={48} />
  );

  const titleClass = isSuccess ? 'text-green-700' : 'text-red-700';

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center animate-fade-in">
        {icon}
        <h2 className={`text-xl font-semibold mt-4 ${titleClass}`}>{title}</h2>
        <p className="text-gray-700 mt-2 text-sm">{subtitle}</p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 ${
              isSuccess ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-red-600 hover:bg-red-700'
            } text-white rounded-lg transition`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export function showAlert({ type = 'success', title, subtitle, confirmText, cancelText }) {
  return new Promise((resolve, reject) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = ReactDOM.createRoot(container);

    const cleanup = () => {
      root.unmount();
      container.remove();
    };

    root.render(
      <SweetAlert
        type={type}
        title={title}
        subtitle={subtitle}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={() => {
          resolve(true);
          cleanup();
        }}
        onCancel={() => {
          reject(false);
          cleanup();
        }}
      />
    );
  });
}
