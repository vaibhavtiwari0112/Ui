function createModal({
  sourceFile,
  message,
  classNames = "",
  type = "info",
  onSaveAndContinue = null,
  closeTime = null,
  buttonText = "Save and Continue",
  buttonColor = "",
}) {
  const modal = document.createElement("div");
  modal.className = `fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 transition-opacity ${classNames}`;
  modal.id = "customModal";

  // Define colors and styles based on type
  const typeStyles = {
    success: {
      borderColor: "border-green-600",
      textColor: "text-green-700",
      defaultButtonColor: "bg-green-500 hover:bg-green-600",
    },
    error: {
      borderColor: "border-red-600",
      textColor: "text-red-700",
      defaultButtonColor: "bg-red-500 hover:bg-red-600",
    },
    loading: {
      borderColor: "border-blue-600",
      textColor: "text-blue-700",
      defaultButtonColor: "bg-blue-500 hover:bg-blue-600",
    },
    info: {
      borderColor: "border-yellow-500",
      textColor: "text-yellow-600",
      defaultButtonColor: "bg-yellow-500 hover:bg-yellow-600",
    },
  };

  const { borderColor, textColor, defaultButtonColor } =
    typeStyles[type] || typeStyles["info"];
  const finalButtonColor = buttonColor || defaultButtonColor;

  // Modal content
  modal.innerHTML = `
        <div class="bg-white p-6 rounded-2xl shadow-xl w-96 text-center border-4 ${borderColor}">
            <div class="flex justify-center">
                <dotlottie-player src="${sourceFile}" background="transparent" speed="1" style="width: 250px; height: 250px" loop autoplay></dotlottie-player>
            </div>
            <h3 class="text-2xl font-bold mt-2 ${textColor}">Grocery Store Alert</h3>
            <p class="${textColor} text-lg">${message}</p>
            ${
              onSaveAndContinue
                ? `<button id="saveContinueButton" class="mt-4 ${finalButtonColor} text-white px-6 py-2 rounded-lg">${buttonText}</button>`
                : ""
            }
        </div>
    `;

  document.body.appendChild(modal);

  if (onSaveAndContinue) {
    const saveContinueButton = document.getElementById("saveContinueButton");
    saveContinueButton.addEventListener("click", () => {
      onSaveAndContinue();
      modal.remove();
    });
  }

  if (closeTime) {
    setTimeout(() => modal.remove(), closeTime);
  }

  modal.classList.remove("hidden");
}

// Example Usage
// createModal({
//     sourceFile: 'https://lottie.host/a1a80ba7-2368-4128-89a1-4bfc91480df4/17b9rn0yoT.lottie',
//     message: 'Your order has been placed successfully!',
//     classNames: 'custom-modal-extra-styling',
//     type: 'success',
//     buttonText: 'Proceed to Checkout',
//     buttonColor: 'bg-purple-500 hover:bg-purple-600',
//     onSaveAndContinue: () => {
//         console.log('Order confirmed!');
//     },
//     closeTime: 5000 // Auto-close modal after 5 seconds
// });
