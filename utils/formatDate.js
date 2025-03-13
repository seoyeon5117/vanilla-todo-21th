export const formatDate = () => {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" };
    return today.toLocaleDateString("ko-KR", options);
}