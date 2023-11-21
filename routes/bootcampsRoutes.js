const express = require('express')
const  Bootcamp = require('../models/bootcampsModel')
//definir ruteador de bootcamps
const {default: mongoose } = require ("mongoose");
const router = express.Router()

router.get (('/'),
        async (req, res)=> {
            // traer los bootcamps en bd 
            const bootcamps = await Bootcamp.find()
               await Bootcamp.find()
    // scenario; no hay bootcamps en el esencario 
    if(bootcamps.length> 0){
     //hay bootvamps en mongo
     res.
        status(200).
        json({
        success: true,
        data: bootcamps
     })
    }else{
     // no hay bootcamps 
     res.status(404).json({
            success: false,
             msg: "no hay bootcamps"
           })
   }
})

router.get ('/:id',
        async(req , res) => {
        const bootcampId = req.params.id
        try{
            //escenario : botcap se invalido(1,a)
            if(!mongoose.Types.ObjectId.isValid(bootcampId)){
                return res.status(500).json({
                    success: false,
                    msg : "id  invalido",
                })
            }else{
        const bootcamp = await Bootcamp.
                      findById(bootcampId)
        if(!bootcamp){
            //si no hay bootcamp
            res.status(404).json(
                {
                    succes : false,
                    msg: "bootcamps no encontrado"
        
                }
            )
        } else { 
            return res.status(200).json(
                {
                succes : true,
                data :bootcamp
    
                })
            }
        }
        }catch (error){
            res.status (500).jso({
                success : false,
                msg: `Error encontrado: ${error.message}`
            })

        }
        //Consultar bootcamp po id
        const bootcamp = await Bootcamp.findById(bootcampId)
        return res.json({
            succes : true,
            data :bootcamp

         })

    })


    router.post('/', async (req, response) => {
        try{const newBootcamp = await Bootcamp.create(req.body);
            return restart.status(201).json({
              success: true,
              data: newBootcamp,
            });
            }catch(error){
                response.status(500).json({
                    succes: false,
                    msg: `Error encontrado : ${error.message}`
                })

            }})

            router.put('/:id', async (req, res) => {
                const bootcampId = req.params.id;
            
                try {
                    // Escenario: bootcamp se invalidó (1,a)
                    if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
                        return res.status(500).json({
                            success: false,
                            msg: "ID inválido",
                        });
                    } else {
                        const bootcamp = await Bootcamp.findByIdAndUpdate(
                            bootcampId,
                            req.body,
                            {
                                new: true,
                            }
                        );
            
                        if (!bootcamp) {
                            // Si no hay bootcamp
                            res.status(404).json({
                                success: false,
                                msg: "Bootcamp no encontrado",
                            });
                        } else {
                            return res.status(200).json({
                                success: true,
                                data: bootcamp,
                            });
                        }
                    }
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        msg: `Error encontrado: ${error.message}`,
                    });
                }
            });
//4. eliminar

router.delete ('/:id',
        (req , res) => {
        bootcampId = req.params.id
        return res.json({
            succes : true,
            msg :`eliminando bootcamp cuyo id es: ${bootcampId}`
        }
        )
        })
module.exports = router;