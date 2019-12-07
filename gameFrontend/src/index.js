document.addEventListener("DOMContentLoaded", e => {
  dummyTest();
});

function dummyTest() {
  let formThing = document.getElementById("new-name-form");

  // console.log(formThing);

  formThing.addEventListener("submit", e => {
    // console.log(e);
    alert("testing");
    // e.preventDefault();
  });
}
