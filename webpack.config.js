const path = require("path");

const isProduction = process.env.NODE_ENV == "production";
const nodeExternals = require("webpack-node-externals");
const nodemonPlugin = require("nodemon-webpack-plugin");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const config = {
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    target: "node",
    stats: { warnings: false },
    externalsPresets: { node: true },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                },
                parallel: true,
            }),
        ],
    },
    externals: [
       
        nodeExternals({
            modulesFromFile: true,
            allowlist: [
                "reflect-metadata",
                "dotenv",
                "express",
                "ejs",
                "cors",
                "joi",
                "axios",
                "bcryptjs",
                "jsonwebtoken",
                "mongoose",
                "cookie-parser",
                "express-session",
            ],
        }),
    ],

    plugins: [
        new nodemonPlugin(),
        new CopyWebpackPlugin({
            patterns: [{ from: "src/views", to: "views" }],
        }),
    ],
    resolve: {
        extensions: [".ts", ".js"],
        modules: ["node_modules"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        chunkFilename: "[name].bundle.js",
        filename: isProduction ? "index.js" : "index.js?[fullhash]", // Thêm query parameter vào đây
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};
