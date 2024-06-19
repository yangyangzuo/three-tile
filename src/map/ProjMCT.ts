/**
 *@description: Mercator projection
 *@author: Guojf
 *@date: 2023-04-06
 */

import { Projection, IProjection } from "./Projection";

const EarthRad = 6378; //Earth's radius(km)

export class ProjMCT extends Projection implements IProjection {
	public readonly ID = "3857"; // projeciton ID
	public readonly isWGS = false; // Is linear projection of latitude and longitude
	public mapWidth = 2 * Math.PI * EarthRad; //E-W scacle Earth's circumference(km)
	public mapHeight = this.mapWidth; //S-N scacle Earth's circumference(km)
	public mapDepth = 1; //Height scale

	/**
	 * Latitude and longitude to projected coordinates
	 * @param lon longitude
	 * @param lat Latitude
	 * @returns projected coordinates
	 */
	public project(lon: number, lat: number, centralMeridian: number) {
		let x = (((lon - centralMeridian) * Math.PI) / 180) * EarthRad;
		const y = Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 180 / 2)) * EarthRad;

		return { x, y };
	}

	/**
	 * Projected coordinates to latitude and longitude
	 * @param x projection x
	 * @param y projection y
	 * @returns latitude and longitude
	 */

	public unProject(x: number, y: number, centralMeridian: number) {
		const lon = (((x / EarthRad / Math.PI) * 180 + centralMeridian + 540) % 360) - 180;
		const lat = ((Math.atan(Math.exp(y / EarthRad)) * 2 - Math.PI / 2) * 180) / Math.PI;

		return { lat, lon };
	}
}
