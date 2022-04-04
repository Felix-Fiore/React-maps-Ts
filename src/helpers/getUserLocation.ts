export const getUserLocation = async (): Promise<[number, number]> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                resolve([coords.longitude, coords.latitude]);
            },
            (err) => {
                alert('Could not get your location. Please try again.');
                console.log(err);
                reject();
            }
        );
    });
};
