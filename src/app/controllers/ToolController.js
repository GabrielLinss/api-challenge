const Tool = require('../models/Tool');

exports.save = async (req, res) => {
    const {title} = req.body;

    try{
        if(await Tool.findOne({title})){
            return res.status(401).send({error: 'Tool already exists'});
        }

        const tool = await Tool.create(req.body);

        return res.status(201).send(tool);
    } catch (err){
        return res.status(401).send({error: 'Registration failed'});
    }
};

exports.all = async (req, res) => {
    if(req.query.tag != null){
        const tag = req.query.tag;
        console.log(tag);
    
        try{
            const tools = await Tool.find({ tags: tag });
            if(tools.length > 0){
                return res.status(200).send(tools);
            }
            else{
                return res.status(401).send({error: 'Tools with tag not found'});
            }
        } catch (err){
            return res.status(401).send({error: 'Operation failed'});
        }
    } else {
        try{
            const tools = await Tool.find();
            res.status(200).send(tools);
        } catch (err){
            return res.status(401).send({error: 'Operation failed'});
        }
    }
};

exports.delete = async (req, res) => {
    const _id = req.params.id;

    try{
        await Tool.findByIdAndDelete(_id);
        return res.status(204).send({});
    }catch (err){
        return res.status(401).send({error: 'Operation failed'});    
    }
};
