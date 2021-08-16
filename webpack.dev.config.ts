import webpack from "webpack";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import merge from "webpack-merge";

import {outDir} from './build-constants';
import commonConfig from './webpack.common.config';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const devSpecificConfig: Configuration = {
  mode: "development",
  output: {
    publicPath: "/",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: outDir,
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true,
  },
};

const config: Configuration = merge(commonConfig, devSpecificConfig);

export default config;
