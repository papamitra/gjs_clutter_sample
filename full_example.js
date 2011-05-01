
const Clutter = imports.gi.Clutter;
const Gio = imports.gi.Gio;

const IMAGE_HEIGHT = 100;

function load_image(directory){
    let images = [];
    let dir = Gio.file_new_for_path(directory);
    print(dir.get_uri())
    if(!dir.query_exists(null)){
	print("file not found");
	return images;
    }
    
    let enumerator = dir.enumerate_children("*",null,null);
    while((info = enumerator.next_file(null))){
	let child = dir.get_child(info.get_name());
	let texture = new Clutter.Texture({'filename':child.get_path()});
	scale_texture_default(texture);
	images.push({'texture': texture, 'path': child.get_path()});
    }
    return images;
}

function add_image_actors(stage, images){
    let x=20, y=0;
    for(i in images){
	stage.add_actor(images[i].texture);
	images[i].texture.set_position(x,y);
	y += 100;
	add_to_ellipse_behavioiur(images[i].texture);
	images[i].texture.show();
    }
}

function scale_texture_default(texture) {
    let size = texture.get_base_size();
    const scale = size[1]? IMAGE_HEIGHT / size[1] : 0;
    texture.set_scale(scale, scale);
}

Clutter.init(0,null);

const stage_color = new Clutter.Color({'red':0xB0, 'green':0xB0, 'blue':0xB0, 'alpha':0xff});

let stage = Clutter.Stage.get_default();
stage.set_size(800,600);
stage.set_color(stage_color);

stage.show();

let timeline = new Clutter.Timeline({'duration':2000});

add_image_actors(stage, load_image("./sample_image"));

Clutter.main();
