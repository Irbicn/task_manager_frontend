export const sendData = async (
  url,
  data,
  { success = () => {}, error = () => {}, method = "POST" }
) => {
  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => success(data))
    .catch((err) => error(err));
};
