import { React, Component, useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Sector, Cell } from "recharts";

function EventGenre({ events }) {
    const [ data, setData ] = useState([]);

    function getData () {
        const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];

        return genres.map((genre) => {
            const count = events.filter( ({ summary }) => {
                return summary.includes(genre);
            }).length;

            return {
                name: genre,
                value: count,
            }
        });
    }


    // Run the callback every time anything in the array changes
    const callback = () => { setData(() => getData()); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(callback, [events]);

    const colors = ['red', 'orange', 'black', 'green', 'blue', 'light blue', 'purple']
    return <ResponsiveContainer height={400}>
        <PieChart width={400} height={400} >
            <Pie
                data={data}
                cx='50%'
                cy='50%'
                labelLine={false}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
                label={({name, percent}) => `${name} ${(percent *100).toFixed(0)}%`}
            >
                {data.map((entry, index) => {
                    return <Cell key={`cell-${index}`} fill={colors[index]} />
                })}
            </Pie>
        </PieChart>
    </ResponsiveContainer>
}

export default EventGenre;
