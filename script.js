document.addEventListener('DOMContentLoaded', () => {

let w = 980,
    h = 620

const colors = ['#e3ffea','#aaeda4','#5cdd67','#15cc28']

d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
    .then((data)=>{
     let countyData = topojson.feature(data,data.objects.counties).features;
         d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')
          .then((data)=>{
             let educationData = data;
            
             console.log(educationData)
             console.log(countyData)

             let tooltip = d3.select('.chartHolder')
                           .append('div')
                           .attr('id','tooltip')
                           .style('margin-left','640px')
                           .style('margin-top','-555px')
                           .style('visibility','hidden')
                           
             const mouseOver = (e,d) => {        
                  console.log(educationData.filter((data) => data.fips == d.id)[0])
                  let name = `${educationData.filter((data) => data.fips == d.id)[0].area_name}, ${educationData.filter((data) => data.fips == d.id)[0].state}`
                  let percentage = `${educationData.filter((data) => data.fips == d.id)[0].bachelorsOrHigher}`
                    tooltip.transition()
                           .style('visibility','visible')
                           .style('background-color', fill(percentage))
                    tooltip.text(`${name}: ${percentage}%`)
                           .attr('data-education',percentage) 
               }
         
             const mouseOut = () => {
                    tooltip.transition()
                           .style('visibility','hidden');   
               }       

             const fill = (data) => {
               if (data < 15) {
                  return colors[0];
               } else if (data >= 15 && data < 30 ) {
                  return colors[1];
               } else if (data >= 30 && data <= 45 ) {
                  return colors[2];
               } else if (data > 45 ) {
                   return colors[3];
               }
               }
             
             const svg = d3.select('.chart')
                           .append('svg')
                           .attr('height', h)
                           .attr('width', w);

                        svg.selectAll('path')
                           .data(countyData)
                           .enter()
                           .append('path')
                           .attr('class','county')
                           .attr('d',d3.geoPath()) 
                           .attr('fill',(d) => {                     
                             let fips = educationData.filter((obj) => obj.fips == d.id);                         
                             return fill(fips[0].bachelorsOrHigher)
                           })
                           .attr('data-fips',(d) => educationData.filter((obj) => obj.fips == d.id)[0].fips)
                           .attr('data-education',(d) => educationData.filter((obj) => obj.fips == d.id)[0].bachelorsOrHigher)  
                           .on('mouseover',mouseOver)
                           .on('mouseout',mouseOut)     
                                   
           let legend = svg.append('g')
                           .attr('id','legend')
               
                     legend.append('rect')
                           .attr('width','65px')
                           .attr('height','20px')
                           .attr('x','600')
                           .attr('y','14')
                           .attr('fill', colors[0])
                     legend.append('text')
                           .text('0%')
                           .attr('x','595')
                           .attr('y','44')
                           .attr('fill', 'aliceblue')
                           
                     legend.append('rect')
                           .attr('width','65px')
                           .attr('height','20px')
                           .attr('x','665')
                           .attr('y','14')
                           .attr('fill', colors[1])
                     legend.append('text')
                           .text('15%')
                           .attr('x','660')
                           .attr('y','44')
                           .attr('fill', 'aliceblue')    
                           
                     legend.append('rect')
                           .attr('width','65px')
                           .attr('height','20px')
                           .attr('x','730')
                           .attr('y','14')
                           .attr('fill', colors[2])
                     legend.append('text')
                           .text('30%')
                           .attr('x','720')
                           .attr('y','44')
                           .attr('fill', 'aliceblue')       
               
                     legend.append('rect')
                           .attr('width','65px')
                           .attr('height','20px')
                           .attr('x','795')
                           .attr('y','14')
                           .attr('fill', colors[3])
                     legend.append('text')
                           .text('45%')
                           .attr('x','788')
                           .attr('y','44')
                           .attr('fill', 'aliceblue')  

         })   
         .catch((e) => console.log(e));    
    })
    .catch((e) => console.log(e));      
})