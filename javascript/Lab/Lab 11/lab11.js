const result = [0, 0, 0, 0];

let numberOfVotes = (value) => {
  result[value] += 1;
};

let displayResult = () => {
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("arrayResult").innerText = `[${result}]`;
  document.getElementById("stringResult").innerText =
    "Poll results are " + result.toString();
};

async function getData() {
  const { value: code } = await Swal.fire({
    title: "What is your favourite programming language? ",
    input: "number",

    allowOutsideClick: false,
    inputLabel: "(Write option number)",
    html: `<ul>
      <li>0 Javascript</li>
      <li>1 Python</li>
      <li>2 Rust</li>
      <li>3 C++</li>
    </ul>`,
    inputValidator: (value) => {
      if (value * 1 < 0 || value * 1 > 3) {
        Swal.fire({
          allowOutsideClick: false,
          icon: "error",
          title: "Options Error",
          text: "0 <= option <= 3!",
          confirmButtonText: "Choose Again",
          confirmButtonAriaLabel: "Choose Again",
          showDenyButton: true,
          denyButtonText: `Stop`,
        }).then((result) => {
          if (result.isConfirmed) {
            return getData();
          } else if (result.isDenied) {
            displayResult();
          }
        });
      }
      numberOfVotes(value * 1);
    },
  });

  if (code) {
    Swal.fire({
      allowOutsideClick: false,
      html: `You selected: ${code}`,
      confirmButtonText: "Choose Again",
      confirmButtonAriaLabel: "Choose Again",
      showDenyButton: true,
      denyButtonText: `Stop`,
    }).then((result) => {
      if (result.isConfirmed) {
        return getData();
      } else if (result.isDenied) {
        displayResult();
      }
    });
  }
}

// run at start
getData();
