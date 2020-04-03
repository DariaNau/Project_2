const db = require("../models");

module.exports = (userid, filterSettings) => {
    let query = { include: db.Instructor, order: [['createdAt', 'DESC']] };
    if (filterSettings.classes === "my") {
        query = {
            include: [{
                model: db.Instructor,
                where: {
                    UserId: userid
                }
            }, db.Instructor]
        }
    }

    return db.Class.findAll(query).then((dbClass) => {

        dbClassValues = dbClass.map(classObj => {
            classObj.dataValues.Instructor = classObj.dataValues.Instructor.dataValues;
            return classObj.dataValues;
        });



        console.log(dbClassValues);

        // duration filter block
        if (filterSettings.duration !== null) {
            switch (filterSettings.duration) {
                case "d1": {
                    dbClassValues = dbClassValues.filter(classObj => classObj.duration < 30);
                    break;
                }
                case "d2": {
                    dbClassValues = dbClassValues.filter(classObj => classObj.duration < 60);
                    break;
                }
                case "d3": {
                    dbClassValues = dbClassValues.filter(classObj => classObj.duration >= 60);
                    break;
                }
            }
        }

        // price filter block
        if (filterSettings.price !== null) {
            switch (filterSettings.price) {
                case "free": {
                    dbClassValues = dbClassValues.filter(classObj => classObj.price == 0);
                    break;
                }
                case "p2": {
                    dbClassValues = dbClassValues.filter(classObj => classObj.price < 25);
                    break;
                }
                case "p3": {
                    dbClassValues = dbClassValues.filter(classObj => classObj.price < 50);
                    break;
                }
            }
        }

        // instructor class block

        return dbClassValues;
    });
}