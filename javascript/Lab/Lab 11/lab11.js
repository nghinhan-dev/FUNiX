const result = [0, 0, 0, 0];

let numberOfVotes = (value) => {
  result[value] += 1;

  console.log(result);
};

let displayResult = () => {
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("arrayResult").innerText = result;
  document.getElementById("stringResult").innerText =
    "Poll results are " + result.toString();
};

async function getData() {
  const inputOptions = {
    0: "0 JavaScript",
    1: "1 Python",
    2: "2 Rust",
    3: "3 C++",
  };

  const { value: color } = await Swal.fire({
    title: "What is your favourite programming language? ",
    input: "radio",
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) {
        return "You need to choose something!";
      }
      numberOfVotes(value);
    },
  });

  if (color) {
    Swal.fire({
      html: `You selected: ${color}`,
      confirmButtonText: "Choose Again",
      confirmButtonAriaLabel: "Choose Again",
      showDenyButton: true,
      denyButtonText: `Stop`,
    }).then((result) => {
      if (result.isConfirmed) {
        return getData();
      } else if (result.isDenied) {
        // Swal.fire({
        //   html: `You selected: ${color}`,
        // });
        displayResult();
      }
    });
  }
}

getData();
