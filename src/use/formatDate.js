export const formatDate = (num) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(num);
    return date.toLocaleDateString(undefined, options);
}