export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    let formattedDate = date.toLocaleDateString('en-US', options);

    const day = date.getDate();
    const suffix = ["th", "st", "nd", "rd"][
        (day % 100 > 10 && day % 100 < 14) ? 0 :
            (day % 10 > 3) ? 0 : day % 10
    ];
    return formattedDate.replace(/(\d+)(,)/, `$1${suffix}$2`);
}