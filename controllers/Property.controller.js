const mongoose = require("mongoose");
const Property = require("../models/Property.model");
const Type = require("../models/PropertyTypes.model");
const moment = require("moment");
const fs = require("fs");
const Grid = require("gridfs-stream");

const Util = require('../utils/Slug.generator');
const API = require("../handlers/API");
const { respond } = API;

const gfs;
const conn = mongoose.connection;
conn.on('connected', () => { 
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('imageMeta');
 });

module.exports = {
  propertyTypeList: (req, res) => {
    try {
      const type = await Type.find({ is_active: true });
      res.json(respond(true, "List of all activat properties!", type));
    } catch (e) {
      res.json(respond(false, "Oops, there is something wrong!"));
    }
  },
  addPropertyType: (req, res) => {
     try {
      const data = req.body;
      try {
        const type = new Type(data);
        type.createdOn=Date.now();
        const newType = await type.save();
        res.json(respond(true, "One new Property type added successfuly!", newType));
      } catch (e) {
        res.json(respond(false, "Oops, unable to save the data!"));
      }
    } catch (e) {
      res.json(respond(false, "there is no data!"));
    }
  },
  addNewProperty: async (req, res) => {
 let imgs = [];  
 try {
       if(req.files.length)
            req.files.forEach(ele => imgs.push(ele.filename) );
            let slug  = await Util.slugGenerator(req.body.title, 'title', 'property');//Creating slug for the listing 
             req.body.slug = slug;
            req.body.type = req.body.Proptype;
            req.body.cornerPlot = req.body.cornerPlot ? true : false;
            req.body.images = imgs;      
            req.body.imgPath = 'properties';
            if(!req.body.isSociety){
                req.body.flatNo = '';
                req.body.societyName = '';
            }            
      try {
          const prop = new Property(req.body);
            const newProp = await prop.save();
        res.json(respond(true, "One new property added successfuly!", newProp));
      } catch (e) {
        res.json(respond(false, "Oops, unable to save the data!"));
      }
    } catch (e) {
      res.json(respond(false, "there is no data!"));
    }

  },
  getUserList: (req, res) => {
      try {
     const list = await Property.find({ isActive: true, userId: req.params.userId })
            .populate('city', 'name')
            .populate('state', 'name')
            .populate('type', 'title');
      res.json(respond(true, "List of all activat user's property!", list));
    } catch (e) {
      res.json(respond(false, "Oops, there is something wrong!"));
    }
  },
  getSingleProperty: async (req, res) => {
     try {
      const Prop  = await Property.findOne({ slug: req.params.propertySlug })
                .populate('city', 'name')
                .populate('state', 'name')
                .populate('type', 'title');
                let Files = [];
            if(Prop && Prop.images.length){
                Files = await gfs.files.find({ filename: { $in : result.images } }).toArray();
            }
      res.json(respond(true, "The property founded!", Prop,Files));
    } catch (e) {
      res.json(respond(false, "Oops, there is something wrong!"));
    }
  },
  getFullList: (req, res) => {
     try {
   const Prop = Property.find({ isActive: true })
            .populate('city', 'name')
            .populate('state', 'name')
            .populate('type', 'title')
            .populate('userId', 'name');
      res.json(respond(true, "List of all active properties!",Prop));
    } catch (e) {
      res.json(respond(false, "Oops, there is something wrong!"));
    }
  },
  markAsSold: async (req, res) => {
 try {
     const result = await Property.update({ slug: req.params.propertySlug }, { status: req.body.status });
            console.log({result});
            if(result && result.nModified == 1) 
      res.json(respond(true, "Property has been updated Successfully", result));
    } catch (e) {
      res.json(respond(false, "Oops, there is something wrong!"));
    }
  },
  filterProperties: (req, res) => {
   let query = {};
 try {
        // query['isActive'] = true
        if (req.query.propertyFor)
            query['propertyFor'] = { $in: req.query.propertyFor.split(",") }
        if (req.query.type)
            query['type'] = { $in: req.query.type.split(",") }
        if (req.query.city)
            query['city'] = { $in: req.query.city.split(",") }
        if (req.query.userId)
            query['userId'] = req.query.userId
        if (req.query.notUserId)
            query['userId'] = { $ne: req.query.notUserId }
        if (req.query.status)
            query['status'] = { $in: req.query.status.split(",") }
       // console.log({ query });
       const result = Property.find(query)
            .populate('city', 'name')
            .populate('state', 'name')
            .populate('type', 'title')
            .populate('userId', 'name');
      res.json(respond(true, "Query is Done", result));
    } catch (e) {
      res.json(respond(false, "Oops, there is something wrong!"));
    }
  },
  showGFSImage: (req, res) => {
    try{
const file = gfs.files.findOne({ filename: req.params.filename });
if (!file || file.length === 0) throw new Error ('Oops, there is no file!') // Check if file
 if (file.contentType === 'image/jpeg' || file.contentType === 'image/png'){ // Check if image
   const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
 }else throw new Error('Oops, there is no image');
    }catch(err){
res.json(respond(false, {message: err.message}));
    } 
  
}

};
