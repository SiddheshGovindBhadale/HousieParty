import { Dimensions, PixelRatio } from "react-native";
const { width, height } = Dimensions.get('window');

const colors = {
    White: "#FFFFFF",
    DarkGray: "#212121",
}

const flex = {
    // Flex Direction
    flex: 1,
    row: "row",
    column: "column",
    rowReverse: "row-reverse",
    columnReverse: "column-reverse",
    overflow: "hidden",

    // Justify Content
    justifyCenter: "center",
    justifyStart: "flex-start",
    justifyEnd: "flex-end",
    justifyBetween: "space-between",
    justifyAround: "space-around",
    justifyEven: "space-evenly",

    // Align Items
    alignCenter: "center",
    alignItem: "center",
    alignStart: "flex-start",
    alignEnd: "flex-end",
    alignStretch: "stretch",
    alignBaseline: "baseline",
    left: "left",
    auto: "auto",

    // Align Self
    selfCenter: "center",
    selfStart: "flex-start",
    selfEnd: "flex-end",
    selfStretch: "stretch",
    selfBaseline: "baseline",

    // Flex Wrap
    wrap: "wrap",
    noWrap: "nowrap",
    wrapReverse: "wrap-reverse",
    textAlign: "center",

    // Align Content
    contentStart: "flex-start",
    contentEnd: "flex-end",
    contentCenter: "center",
    contentStretch: "stretch",
    contentBetween: "space-between",
    contentAround: "space-around",

    // position
    positionAbsolute: "absolute",
    positionRelative: "relative",
    positionStatic: "static",

    // resizeMode
    resizeModeContain: "contain",
    resizeModeCenter: "center",
    resizeModeCover: "cover",
    resizeModeRepeat: "repeat",
    resizeModeRepeatStretch: "stretch",

    underline: "underline",
    dotted: "dotted",
    displayFlex: "flex",
    textAlignJustify: "justify",
};

export {
    colors, flex
};

export const Responsive = (value) => {
    const baseWidth = 375;
    const baseHeight = 667;

    const scaleWidth = width / baseWidth;
    const scaleHeight = height / baseHeight;

    const scale = Math.min(scaleWidth, scaleHeight);

    return Math.round(PixelRatio.roundToNearestPixel(value * scale));
};