import {Schema, model} from "mongose";

const roleSchema = new Schema(
    {name: String},
    {versionKey:false}
);

export default model("Role", roleSchema);