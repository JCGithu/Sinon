var wave1_speed = 15000;
var wave2_speed = 12000;
var wave3_speed = 9500;

anime({
    targets: '#wave1',
    translateX:[0, 1700],
    duration:wave1_speed,
    easing: 'linear', 
    loop: true
},0)

anime({
    targets: '#wave2',
    translateX:[0, 1700],
    duration:wave2_speed,
    easing: 'linear', 
    loop: true
},0)

anime({
    targets: '#wave1',
    opacity: 0,
    duration: 1,
    easing: 'linear', 
},0)

anime({
    targets: '#wave1',
    opacity: [0, 0.6],
    delay: 5000,
    duration: 3000,
    easing: 'linear', 
},0)

anime({
    targets: '.wavecontainer',
    translateY:[200,135],
    duration: 4000,
    easing: 'easeOutCubic',
})
