import icons from "./icons";

const { BsStarFill, BsStar } = icons;

export const createSlug = (str) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

export const formatMoney = (num) => Number(num?.toFixed(1)).toLocaleString();

export const renderStarFromNumber = (num, size) => {
  if (!Number(num)) return;
  const star = [];
  for (let i = 0; i < +num; i++)
    star.push(<BsStarFill key={i} size={size || 16} />);
  for (let i = 5; i > +num; i--)
    star.push(<BsStar key={i} size={size || 16} />);
  return star;
};

export function seconsToHms(d) {
  d = Number(d) / 1000;
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);
  return { h, m, s };
}

export const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);
  for (let i of formatPayload) {
    if (i[1].trim() === "") {
      invalids++;
      setInvalidFields((prev) => [
        ...prev,
        { name: i[0], mes: "Require this field~" },
      ]);
    }
  }
  // for (let i of formatPayload) {
  //   switch (i[0]) {
  //     case "email":
  //       const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //       if (!i[1].match(regex)) {
  //         invalids++;
  //         setInvalidFields((prev) => [
  //           ...prev,
  //           { name: i[0], mes: "Email invalid~" },
  //         ]);
  //       }
  //       break;
  //     case "password":
  //       if (i[1].length < 6) {
  //         invalids++;
  //         setInvalidFields((prev) => [
  //           ...prev,
  //           { name: i[0], mes: "Passworld minimum 6 characters~" },
  //         ]);
  //       }
  //       break;
  //     case "phone":
  //       if (!+i[1]) {
  //         invalids++;
  //         setInvalidFields((prev) => [
  //           ...prev,
  //           { name: i[0], mes: "Phone must be a number~" },
  //         ]);
  //       }
  //       if (+i[1] < 0) {
  //         invalids++;
  //         setInvalidFields((prev) => [
  //           ...prev,
  //           { name: i[0], mes: "Phone can't make sound~" },
  //         ]);
  //       }
  //       if (+i[1].length !== 10) {
  //         invalids++;
  //         setInvalidFields((prev) => [
  //           ...prev,
  //           { name: i[0], mes: "Phone must have 10 numbers~" },
  //         ]);
  //       }
  //       break;
  //   }
  // }

  return invalids;
};
