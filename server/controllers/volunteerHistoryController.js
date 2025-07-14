exports.getVolunteerHistory = (req, res) => {
    const volunteer = {
        name: "Michael Carreno",
        status: "Active",
        history: [
            {
                organization: "Red Cross",
                role: "Disaster Relief",
                date: "2021-01-01",
                hours: 4,
            },
            {
                organization: "Houston Animal Shelter",
                role: "Animal Care",
                date: "2021-01-01",
                hours: 3,
            },
        ],
    };
    res.status(200).json(volunteer);
}