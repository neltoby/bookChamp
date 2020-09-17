export const category = [
    {text: 'Finance', num: 10, col: '#e85f29'},
    {text: 'Science and Technology', num: 13, col: '#00e600'},
    {text: 'Politics', num: 15, col: 'orange'},
    {text: 'Sports', num: 10, col: '#ff1a66'},
    {text: 'Entertainment', num: 10, col: '#9999ff'},
    {text: 'Socials', num: 12, col: '#e6e600'},
    {text: 'History', num: 10, col: '#033268'},
    {text: 'Lifestyle', num: 10, col: 'green'},
    {text: 'Geography', num: 10, col: '#e85f29'},
]

export const capitalize = (str) => {
    if(typeof str !== 'string') return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
}