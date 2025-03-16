const FORMAT_OPTIONS = { year: "numeric", month: "long", day: "numeric", weekday: "long" };

export const formatDate = (dayOffset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    return date.toLocaleDateString("ko-KR", FORMAT_OPTIONS);
}