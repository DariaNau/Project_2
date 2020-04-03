const setSelected = (el) => {
    $(el).closest('li').addClass("selected").siblings().removeClass("selected");
}

const applySettings = () => {

    let filterSettings = {};

    $.get("/api/user_data").then(user => {
        let queryURL;

        if (user.instructor) {
            queryURL = "/instructors?parameters=";
        } else {
            queryURL = "/students/filtered?parameters=";
        }

        $("li.selected").each(function () {

            let setting = $(this).children().data("setting");

            switch (setting) {
                case "my":
                case "all": {
                    filterSettings.classes = setting;
                    break;
                }
                // d for duration
                case "d1":
                case "d2":
                case "d3": {
                    filterSettings.duration = setting;
                    break;
                }
                // p for price
                case "free":
                case "p2":
                case "p3": {
                    filterSettings.price = setting;
                    break;
                }
                // if instructor was chosen, store the instructor id in req
                case "Instructor": {
                    filterSettings.instructor = $(this).children().data("id");
                    break;
                }
            }
        });

        console.log(filterSettings);

        if ($.isEmptyObject(filterSettings)) {
            return;
        }

        queryURL += encodeURIComponent(JSON.stringify(filterSettings));
        window.location.href = queryURL;
    });
};