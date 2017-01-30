function clamp(x, a, b) {
    return Math.max(a, Math.min(x, b))
}

function clampColor(x) {
    return Math.max(0.0, Math.min(x, 1.0))
}


module.exports = {
    clamp: clamp,
    clampColor: clampColor,
}