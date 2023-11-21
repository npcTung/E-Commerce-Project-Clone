import icons from "./icons";

const { BsStarFill, BsStar } = icons;

export const createSlug = (str) =>
  str
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

export const formatMoney = (num) => Number(num?.toFixed(1)).toLocaleString();

export const renderStarFromNumber = (num, size) => {
  const star = [];
  if (!Number(num))
    for (let i = 0; i < +num; i++)
      star.push(<BsStar key={i} size={size || 16} />);
  num = Math.round(num);
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
        { name: i[0], mes: "Trường này không được để trống~" },
      ]);
    }
  }
  for (let i of formatPayload) {
    switch (i[0]) {
      case "email":
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
        if (!i[1].match(regex)) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: i[0], mes: "Email không hợp lệ~" },
          ]);
        }
        break;
      case "password":
        if (i[1].length < 6) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: i[0], mes: "Mật khẩu tối thiểu 6 ký tự~" },
          ]);
        }
        break;
      case "phone":
        if (!+i[1]) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: i[0], mes: "Số điện thoại phải là số~" },
          ]);
        }
        if (+i[1] < 0) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: i[0], mes: "Số điện thoại không là số âm~" },
          ]);
        }
        if (+i[1].length !== 10) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: i[0], mes: "Điện thoại phải có 10 số~" },
          ]);
        }
        break;
    }
  }

  return invalids;
};

export const generateRange = (start, end) => {
  const length = end + 1 - start;
  return Array.from({ length }, (_, index) => start + index);
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
