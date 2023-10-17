function rng(floor, ceiling) {

    return (Math.random() * (ceiling - floor)) + floor;

}// rng(floor, ceiling)

function rngInt(floor, ceiling) {

    return Math.floor(rng(floor, ceiling));

}// rng(floor, ceiling)