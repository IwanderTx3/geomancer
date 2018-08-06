var mh = 128;
var mw = 64;
var worldMap = [];
var cornerStones =[];
var mapSeedSpread = 9;
var apiroot='http://localhost:3100'


function tile(mapColum,mapRow,coord)
    {
        this.coord = coord;
        this.colum = mapColum;
        this.row = mapRow;
        this.tileType = Math.floor(Math.random() * 8);
        this.generated = false;
        //this.checked = 0;
    }

function generateBlankMap(mh,mw)
    {
        let tempmh = 0
        while (tempmh < mh) {
            tempmh = tempmh +1;
            let mapRow = tempmh;
            let tempmw = 0;
                while (tempmw< mw) {
                    tempmw = tempmw +1;
                    let mapColum = tempmw;    
                    let coord = mapColum+","+mapRow;
                    var hex = coord ;
                    this[hex] = new tile(mapColum,mapRow,coord);
                    worldMap.push(this[hex])
        }}
        return worldMap;
    }

function initmap(mh,mw,mapSeedSpread)
    {
        var mapDivision = Math.sqrt(mapSeedSpread);
        var colblock = mw/mapDivision;

        var rowblock = mh/mapDivision;
        var colposition1 = Math.round(colblock/2);
        var colposition2 = Math.round(colblock+(colblock/2));
        var colposition3 = Math.round((colblock*2)+(colblock/2));
        var rowposition1 = Math.round(rowblock/2);
        var rowposition2 = Math.round(rowblock+(rowblock/2));
        var rowposition3 = Math.round((rowblock*2)+(rowblock/2));
        var hexCoord = colposition1+","+rowposition1;
        var hexCoord2 = colposition2+","+rowposition1;
        var hexCoord3 = colposition3+","+rowposition1;
        var hexCoord4 = colposition1+","+rowposition2;
        var hexCoord5 = colposition2+","+rowposition2;
        var hexCoord6 = colposition3+","+rowposition2;
        var hexCoord7 = colposition1+","+rowposition3;
        var hexCoord8 = colposition2+","+rowposition3;
        var hexCoord9 = colposition3+","+rowposition3;
        cornerStones = [hexCoord,hexCoord2,hexCoord3,hexCoord4,hexCoord5,hexCoord6,hexCoord7,hexCoord8,hexCoord9]
        for (var i=0; i<worldMap.length; i++) {
            if (worldMap[i].coord == hexCoord ){worldMap[i].tileType = 7; worldMap[i].generated = true;}
            if (worldMap[i].coord == hexCoord2 ){worldMap[i].tileType = 7; worldMap[i].generated = true;}
            if (worldMap[i].coord == hexCoord3 ){worldMap[i].tileType = 7; worldMap[i].generated = true;}
            if (worldMap[i].coord == hexCoord4 ){worldMap[i].tileType = 7; worldMap[i].generated = true;}
            if (worldMap[i].coord == hexCoord5 ){worldMap[i].tileType = 7; worldMap[i].generated = true;}
            if (worldMap[i].coord == hexCoord6 ){worldMap[i].tileType = 7; worldMap[i].generated = true;}
            if (worldMap[i].coord == hexCoord7 ){worldMap[i].tileType = 7; worldMap[i].generated = true;}
            if (worldMap[i].coord == hexCoord8 ){worldMap[i].tileType = 7; worldMap[i].generated = true;}
            if (worldMap[i].coord == hexCoord9 ){worldMap[i].tileType = 7; worldMap[i].generated = true;}}}

function tiletyper(){return 6}

function findTile (hexCoord) {
    for (var i=0; i<worldMap.length; i++) {
        if (worldMap[i].coord == hexCoord ){
            worldMap[i].checked = 'Yes'
             working = worldMap[i] }}}

function fillMap (cornerStones){
    for (var i=0; i<cornerStones.length; i++) {
        let hexCoord = cornerStones[i];
        findTile(hexCoord)
        findNeigbors(working)

        } 
    }

    
function findNeigbors (working)
{
  let  north = (working.colum)+','+(working.row-1)
  let northeast = (working.colum +1)+','+(working.row-1)
  let southeast = (working.colum +1)+','+(working.row)
  let south = (working.colum)+','+(working.row+1)
  let southwest = (working.colum -1)+','+(working.row)
  let northwest = (working.colum -1)+','+(working.row-1)
  buildingArray = [north, northeast ,southeast, south, southwest, northwest]
  buildingArray.forEach(element => 
    {
      let hexCoord = element  
      for (var i=0; i<worldMap.length; i++) 
      {
        if (worldMap[i].coord == hexCoord )
        {
            if (worldMap[i].generated == false)
            {
            worldMap[i].tileType = tiletyper();
            worldMap[i].generated = true; 
            }}}})}

function publishMap(worldMap){
    var publishedWorld = Json.stringify(worldMap)
}
function checkMap(worldMap){
    var tempMap = []
    worldMap.forEach(element =>{
        if (element.tileType != null)
        {tempMap.push(element)}
    })
    //console.log(worldMap)
}

function generateMap(mh,mw,mapSeedSpread){
    document.getElementById("gen-respones").innerHTML = "World Created";
    console.log('Clicked')
    generateBlankMap (mh,mw);
    initmap (mh,mw,mapSeedSpread);
    fillMap(cornerStones);
    checkMap(worldMap);    
}

 $('#genbtn').on('click', function (){
     generateMap(mh,mw,mapSeedSpread)
})

 $('#pubbtn').on('click', function (){
    var unqid = Math.floor(Math.random() * 100)+1
     var mapdata =                 {
        mapname: "World Map "+unqid,
        mh: mh,
        mw: mw,
        mapfile: worldMap
        }
    
    fetch(apiroot+'/mappublisher/postmap',
            {
            method:"POST",
            body: JSON.stringify(mapdata),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
            } 
        )
        .then((response)=>{
            return response.json()
        })
    .catch(error =>{
        console.log(error);
    })
 })





// generateBlankMap (mh,mw);
// initmap (mh,mw,mapSeedSpread);
// fillMap(cornerStones);
// checkMap(worldMap);
// publishMap(worldMap)




