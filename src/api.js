/**
 * @param {*} events:
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
    const locations = events.map( event => event.location);
    // Set removes duplicates
    // Using spread converts back to array
    return [...new Set(locations)];
}