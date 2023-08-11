import React , { useRef, useEffect}  from 'react'
import { loadModules } from 'esri-loader'


function Map() {
    const MapEl = useRef(null)
    // const view; //declare view variable outside useEffect

    useEffect(
        ()=>{
            let view;
        loadModules(["esri/views/MapView","esri/WebMap", "esri/layers/GeoJSONLayer"],{
            css:true
        }).then(([MapView,WebMap, GeoJSONLayer])=>{
            const webmap = new WebMap({
                basemap:'topo-vector'
            })

            const renderer={
                type: "simple",
                field: "arrest_charge",
                symbol: {
                    type:"simple-marker",
                    color: "orange",
                    outline: {
                        color: "white"
                    }
                },
                visualVariables: [{
                    type: "color",
                    field: "arrest_charge",
                    stops: [{
                        value: "12000",
                        color: "red"
                    },
                    {
                        value: "20000",
                        color: "orange"
                    },
                    {
                        value: "26003",
                        color: "blue"
                    },
                    {
                        value: "38003",
                        color: "yellow"
                    },
                    {
                        value: "26009",
                        color: "brown"
                    },
                    {
                        value: "70000",
                        color: "purple"
                    },
                    {
                        value: "24001",
                        color: "black"
                    },
                    {
                        value: "13002",
                        color: "green"
                    },
                ]
                }]

            };
            
            const template={
                title: "badass motherfucker",
                content: "Crime Category: {offense_description} at {address}" 
            }


            view = new MapView({
                map:webmap,
                center:[-83.0458, 42.3314],
                zoom:11,
                //use the ref as a container
                container:MapEl.current

            })
            const geojsonLayer = new GeoJSONLayer({
                url:"https://raw.githubusercontent.com/adarshvarma15/mygeojson/main/RMS_Crime_Incidents%20edited.geojson",
                renderer: renderer,
                popupTemplate: template,
            });
            webmap.add(geojsonLayer)
        })
        return()=>{
            //close the map view when nothing in view
            if(view){
                view.destroy()
                view=null
            }
        }
    })
    return (
        <div style={{height:'100vh'}} ref={MapEl}>

        </div>

    )

}

export default Map