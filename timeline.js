
const Clutter = imports.gi.Clutter;
const Lang = imports.lang;
Clutter.init (0, null);

let rotation_angle = 0;

let stage = Clutter.Stage.get_default();
let stage_color = new Clutter.Color({red:0x00, blue:0x00, green:0x00});

stage.set_color(stage_color);
stage.set_size(200,200);

let r = new Clutter.Rectangle();
r.set_size(70,70);
r.set_position(50,100);

stage.add_actor(r);

r.show();
stage.show();

let timeline = new Clutter.Timeline({'duration':500});
timeline.connect('new-frame', Lang.bind(this,on_time_new_frame));
timeline.set_loop(true);
timeline.start();

Clutter.main();
stage.destroy();

function on_time_new_frame(timeline, frame_num, data){
    rotation_angle += 1;
    if(rotation_angle >= 360) rotation_angle=0;
    r.set_rotation(Clutter.RotateAxis.X_AXIS, rotation_angle, 0,0,0);
}
