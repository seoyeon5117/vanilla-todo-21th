export const formatDate = (dayOffset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" };
    return date.toLocaleDateString("ko-KR", options);
}