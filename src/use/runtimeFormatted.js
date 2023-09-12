export const formatDuration = (num) => {
    function formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (hours > 0 && mins > 0) {
            return `${hours}h ${mins}min`;
        } else if(hours === 0 && mins === 0) {
            return 'Unknown Time';
        } else if (hours > 0) {
            return `${hours}h`;
        } else {
            return `${mins}min`;
        }
    }
    return formatDuration(num);
}