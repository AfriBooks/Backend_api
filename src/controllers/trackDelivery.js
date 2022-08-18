// NEW APPROACH
// create trackDelivery.js file
// make API call to get orders
// loop and get status, save to an array
// loop status array and change status after random interval

const randomInterval = () => {
    return Math.floor(Math.random() * (6000 - 1000 + 1) + 1000);
};

const update = async(item) => {
    await axios.patch('')
}

const updateStatus = async() => {
    let statusArray = [];
    try {
        await axios
            .get("/orders")
            .then((response) => {
                for (let data in response) {
                    statusArray.push(response[data].status);
                }
            })
            .catch((error) =>
                console.error("Could not get orders, because: ", error)
            );
    } catch (error) {
        console.log("Error: ", error);
    }

    for (let status in statusArray) {
        if (statusArray[status] == "pending") {

        }
    }
};

setTimeout(() => {
    updateStatus();
}, randomInterval());