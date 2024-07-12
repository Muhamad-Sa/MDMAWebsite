       document.addEventListener('DOMContentLoaded', function() {
            const editOverlay = document.querySelector('.edit-overlay');
            const fileInput = document.getElementById('file-input');

            editOverlay.addEventListener('click', function() {
                fileInput.click(); // Trigger click on file input when overlay is clicked
            });

            fileInput.addEventListener('change', function() {
                const selectedFile = fileInput.files[0];
                if (selectedFile) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const imageUrl = event.target.result;
                        // Update the profile picture with the selected image
                        document.getElementById('profile-pic').setAttribute('src', imageUrl);
                    };
                    reader.readAsDataURL(selectedFile);
                }
            });
        });