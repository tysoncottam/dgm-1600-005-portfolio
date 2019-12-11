const navSlider = () =>
{
    const menu = document.querySelector('.menu');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    menu.addEventListener('click', () =>
    {
        nav.classList.toggle('nav-active');
        
        navLinks.forEach((link, index) => 
        {            
            if(link.style.animation)
                {
                    link.style.animation = '';
                }
            else
                {
                    link.style.animation = `navLinkFade 0.2s ease forwards ${index / 7 + .5}s`;
                }        
        });
        menu.classList.toggle('toggle');
    });
}

navSlider();
