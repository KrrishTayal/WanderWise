


function showGallery(region, button) {
    
    document.querySelectorAll('.state-gallery').forEach(gallery => gallery.style.display = 'none');
    document.getElementById(region).style.display = 'grid'; 
    const galleries = document.querySelectorAll('.state-gallery');
    

    const buttons = document.querySelectorAll('.filters button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    
    button.classList.add('active');
}
window.onload = function() {
    showGallery('north'); 
};