import Swal from "sweetalert2";

export function deleteInEditPage(name, value, url) {
  Swal.fire({
    title: `Delete ${name} ${value}`,
    confirmButtonText: "Confirm",
    showLoaderOnConfirm: true,
    showCancelButton: true,
    preConfirm: async () => {
      try {
        const response = await fetch(`http://localhost:5000/${url}/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();

        if (result.errors) {
          throw new Error(response.errors[0]);
        }

        Swal.fire({
          icon: "success",
          title: "Deleted",
        });
      } catch (error) {
        Swal.showValidationMessage(`${error?.message}`);
      }
    },
  });
}
