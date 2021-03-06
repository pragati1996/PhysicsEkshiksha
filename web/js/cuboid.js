var cuboid;
function cuboid_creator(length=5,breadth=10,height=15){
    cuboid = new THREE.Mesh(new THREE.BoxGeometry(length,breadth,height),new THREE.MeshBasicMaterial({color:"red",transparent:true,opacity:1}));
    scene.add(cuboid);
    cuboid.index = count;
    cuboid.name = "objects["+count+"]";
    cuboid.attr = "name,length,breadth,height,color,opacity,material";
    cuboid.obj = "cuboid";
    cuboid.status=-1;
    objects.push(cuboid);
    count+=1;
    dragElements.push(cuboid);
    collidableMeshList.push(cuboid);
    cuboid.obj="cuboid";
    cuboid.parameters = 
    {
        name : cuboid.name,
        length: 5,
        breadth:10,
        height:15,
        color: "#ff0000", // color (change "#" to "0x")
        opacity: 1, 
        visible: true,
        material: "Basic",
        delete:function(){ cuboid.status=0;scene.remove(cuboid);gui.destroy();gui=new dat.GUI();},
        reset: function() { resetObject(cuboid); }
    };
    
    cuboid.gui=function(cuboid)
  {
    
    var cuboidName = gui.add( cuboid.parameters, 'name' ).name('Variable Name').listen();
    
    var cuboidColor = gui.addColor( cuboid.parameters, 'color' ).name('Color').listen();
    cuboidColor.onChange(function(value) // onFinishChange
    {   
        cuboid.material.color.setHex( value.replace("#", "0x") );   
    });
    var cuboidLength = gui.add( cuboid.parameters, 'length' ).min(0).max(50).step(1).name('Length').listen();
    cuboidLength.onChange(function(value)
    {   cuboid.geometry = new THREE.BoxGeometry(value,cuboid.parameters.breadth,cuboid.parameters.height);
        cuboid.geometry.needVerticesUpdate = true;
     });
     var cuboidBreadth = gui.add( cuboid.parameters, 'breadth' ).min(0).max(50).step(1).name('Breadth').listen();
    cuboidBreadth.onChange(function(value)
    {   cuboid.geometry = new THREE.BoxGeometry(cuboid.parameters.length,value,cuboid.parameters.height);
        cuboid.geometry.needVerticesUpdate = true;
     });
     var cuboidHeight = gui.add( cuboid.parameters, 'height' ).min(0).max(50).step(1).name('Height').listen();
    cuboidHeight.onChange(function(value)
    {   cuboid.geometry = new THREE.BoxGeometry(cuboid.parameters.length,cuboid.parameters.breadth,value);
        cuboid.geometry.needVerticesUpdate = true;
     });
    
    var cuboidOpacity = gui.add( cuboid.parameters, 'opacity' ).min(0).max(1).step(0.01).name('Opacity').listen();
    cuboidOpacity.onChange(function(value)
    {   console.log("opacity changing");
        cuboid.material.opacity = value;   
    //    render();
    });
    console.log("before");
    var cuboidMaterial = gui.add( cuboid.parameters, 'material', [ "Basic", "Lambert", "Phong", "Wireframe" ] ).name('material').listen();
    cuboidMaterial.onChange(function(value) 
    {   updateMaterial(cuboid,value); 
      });
    console.log("after");
        var cuboidVisible = gui.add( cuboid.parameters, 'visible' ).name('Visible?').listen();
    cuboidVisible.onChange(function(value) 
    {   cuboid.visible = value;      });
    gui.add( cuboid.parameters, 'delete' ).name("Delete");
    gui.open();

  };
  cuboid.update=function()
  {
      cuboid.material.color.setHex( cuboid.parameters.material.replace("#", "0x") );  
      cuboid.geometry = new THREE.BoxGeometry(cuboid.parameters.length,cuboid.parameters.breadth,cuboid.parameters.height);
      cuboid.geometry.needVerticesUpdate = true;
      cuboid.material.opacity = cuboid.parameters.opacity;
      updateMaterial(cuboid,cuboid.parameters.material);
  };
    
    return cuboid;
}


  

