import changeNavigationBarColor, {
    hideNavigationBar,
    showNavigationBar,
} from 'react-native-navigation-bar-color';

async function changeNavBarColor (color) {
    try {
        const response = await changeNavigationBarColor(color);
    } catch (e) {
        console.log(e)// {success: false}
    }
};

export { changeNavBarColor }