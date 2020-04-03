$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // $.get("/api/user_data").then(data => {
  //   $(".instructor-name").text(data.name);
  // });

  // ADD CLASS FORM
  // Getting references to our form and input
  let classForm = $(".option-add");
  let topicInput = $("input#topic-input");
  let descriptInput = $("input#description-input");
  let dateInput = $("input#datetime");
  let timeInput = $("input#time");
  let capacityInput = $("input#capacity-input");
  let priceInput = $("input#price-input");

  // When the signup button is clicked, we validate the email and password are not blank
  classForm.on("submit", function (event) {
    event.preventDefault();

    let classData = {
      topic: topicInput.val().trim(),
      description: descriptInput.val().trim(),
      datetime: dateInput.val().trim(),
      duration: timeInput.val().trim(),
      capacity: capacityInput.val().trim(),
      price: priceInput.val().trim(),
    };

    console.log("class: ", classData);

    if (!classData.topic || !classData.description || !classData.datetime ||
      !classData.duration || !classData.capacity || !classData.price === null) {
      return;
    }
    createClass(classData.topic, classData.description, classData.datetime, classData.duration, classData.capacity, classData.price);
  });
  // END ADD CLASS FORM

  function createClass(topic, description, datetime, duration, capacity, price) {
    $.post("/api/instructors/add", {
        topic: topic,
        description: description,
        datetime: datetime,
        duration: duration,
        capacity: capacity,
        price: price,
      })
      .then(data => {
        window.location.href = "/instructors"
      })
      .catch(error => console.log(error));
  };

  // UPDATE CLASS FORM
  $(".update-btn").on("click", function () {
    console.log("hit");
    let classid = $(this).data("class-id");

    let topic = $(`input#topic-edit-${classid}`);
    let description = $(`input#description-edit-${classid}`);
    let date = $(`input#datetime-edit-${classid}`);
    let duration = $(`input#duration-edit-${classid}`);
    let capacity = $(`input#capacity-edit-${classid}`);
    let price = $(`input#price-edit-${classid}`);

    let classData = {
      topic: topic.val().trim(),
      description: description.val().trim(),
      datetime: date.val().trim(),
      duration: duration.val().trim(),
      capacity: capacity.val().trim(),
      price: price.val().trim(),
      id: classid
    };

    $.ajax("/api/instructors/update", {
        method: "PUT",
        data: classData
      })
      .then(response => {
        console.log(response);
        if (response === "OK") {
          $(".update-btn").removeData("class-id");
          $("#editClass").hide();

          window.location.href = "/instructors";
        }
      })

  });

  $(".delete-btn").on("click", function () {
    let classid = $(this).data("class-id");
    console.log("hit", classid)

    $.ajax("/api/instructors/delete", {
        method: "DELETE",
        data: {
          id: classid
        }
      })
      .then(response => {
        console.log(response);
        if (response === "OK") {
          $(".delete-btn").removeData("class-id");
          $("#deleteClass").hide();

          window.location.href = "/instructors";
        }
      });
  });

});