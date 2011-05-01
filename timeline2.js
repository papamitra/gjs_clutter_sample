
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

let score = new Clutter.Score();
score.set_loop(true);

let timeline_rotation = new Clutter.Timeline({'duration':500});
timeline_rotation.connect('new-frame', Lang.bind(this,on_time_new_frame));
score.append(null, timeline_rotation);

let timeline_move = new Clutter.Timeline({'duration':500});
timeline_move.connect('new-frame', Lang.bind(this,on_time_move_new_frame));
//score.append(timeline_rotation,timeline_move);
score.append(null,timeline_move);

score.start();

Clutter.main();
stage.destroy();

function on_time_new_frame(timeline, frame_num, data){
    rotation_angle += 1;
    if(rotation_angle >= 360) rotation_angle=0;
    r.set_rotation(Clutter.RotateAxis.X_AXIS, rotation_angle, 0,0,0);
}

function on_time_move_new_frame(timeline, frame_num, data){
    x_position = r.get_x();
    x_position += 1;
    if(x_position >= 150) x_position = 0;
    r.set_x(x_position);
}