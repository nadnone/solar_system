function rotate_around_XZ(target, angle, r)
{
    const x = target.x + Math.cos(angle) * r;
    const z = target.z + Math.sin(angle) * r;

    return {
        "x": x,
        "y": target.y,
        "z": z,
    };
}

export {
    rotate_around_XZ
}