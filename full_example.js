
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
	let texture = new Clutter.Texture({filename:child.get_path()});
	scale_texture_default(texture);
	images.push({texture: texture, path: child.get_path()});
    }
    return images;
}

function add_to_ellipse_behaviour(timeline, start_angle, item){
    let alpha = new Clutter.Alpha({timeline:timeline, mode:Clutter.AnimationMode.EASE_IN_OUT_SINE});
    let behave = new Clutter.BehaviourEllipse({alpha:alpha, 
					       center:new Clutter.Knot({x:320, y:390}),
					       width:450 , height:450,
					       angle_start:start_angle ,angle_end: (start_angle + 360) % 360,
					       direction:Clutter.RotateDirection.CW});
    behave.set_angle_tilt(Clutter.RotateAxis.X_AXIS, -90);
    behave.apply(item);
}

function add_image_actors(stage, images, timeline){
    let x=20, y=0;
    let angle = 0;
    for(i in images){
	stage.add_actor(images[i].texture);
	images[i].texture.set_position(x,y);
	y += 100;
	add_to_ellipse_behaviour(timeline, angle, images[i].texture);
	angle += 30;
	images[i].texture.show();
    }
}

function scale_texture_default(texture) {
    let size = texture.get_base_size();
    const scale = size[1]? IMAGE_HEIGHT / size[1] : 0;
    texture.set_scale(scale, scale);
}

function rotate_all_until_item_is_at_front(timeline, item){
    timeline.stop();
}

Clutter.init(0,null);

const stage_color = new Clutter.Color({red:0xB0, green:0xB0, blue:0xB0, alpha:0xff});

let stage = Clutter.Stage.get_default();
stage.set_size(800,600);
stage.set_color(stage_color);

stage.show();

let timeline = new Clutter.Timeline({duration:2000});
timeline.set_loop(true);

add_image_actors(stage, load_image("./sample_image"), timeline);

timeline.start();

Clutter.main();
