import React, { useState, useEffect } from "react";
import styles from "./AddAnnouncement.module.css";
import hederImg from "../../img/hederIco.jpg";
import backIco from "../../../src/icons/back.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AccessibleTable from "../../components/table/Table"
import { Title } from "@mui/icons-material";


const AddAnnouncements = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });

  const [currency, setCurrency] = useState('AZN');
  const [paymentMethod, setPeymentMethod] = useState('Monthly');
  const [typeOfService, setTypeOfService] = useState('Sale');
  const [typeOfHome, setTypeOfHome] = useState('studio');
  const [roomNumber, setroomNumber] = useState('1');
  const navigate = useNavigate();
  const lang = localStorage.getItem("language");
  const { t, i18n } = useTranslation();
  const [markerPosition, setMarkerPosition] = useState([40.4093, 49.8671]);
  const [center, setCenter] = useState([40.4093, 49.8671]);


  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter([latitude, longitude]);
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []); 
const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleserviceTypeChange = (event) => {
    setTypeOfService(event.target.value);
  };
  const handlesetTypeOfHome = (event) => {
    setTypeOfHome(event.target.value);
  };
  

  const handlesetsetroomNumber = (event) => {
    setroomNumber(event.target.value);
  };
  const handlepaymentMethod = (event) => {
    setPeymentMethod(event.target.value);
  };
  

  const handleChange = (event, newValue) => {
    alert(`You chose "${newValue}"`);
  };
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCenter([latitude, longitude]);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const MapUpdater = ({ newCenter }) => {
    const map = useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setMarkerPosition([lat, lng]); 
      },
    });

    useEffect(() => {
      if (newCenter) {
        map.flyTo(newCenter, 13);
      }
    }, [newCenter, map]);

    return null;
  };

  useEffect(() => {
    i18n.changeLanguage(lang); 
  }, [i18n, lang]);

  const homereturn = () => {
    navigate("/");
  };

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'goldenrod',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'gray',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'orange',
            },
            '& .MuiInputLabel-root[data-shrink="true"]': {
              color: 'goldenrod',
            },
          },
        },
      },
    },
  });

  const [images, setImages] = useState(Array(6).fill(null));


  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const maxFileSize = 2 * 1024 * 1024; 
      if (file.size > maxFileSize) {
        alert("File is too large! Please select a file smaller than 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const MAX_WIDTH = 450; 
          const MAX_HEIGHT = 450; 
          
          let width = img.width;
          let height = img.height;

     
          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round(height * MAX_WIDTH / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round(width * MAX_HEIGHT / height);
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.5); 

          const updatedImages = [...images];
          updatedImages[index] = dataUrl;
          setImages(updatedImages);
        };

        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }

    
  };


  const handleSubmit = async () => {
    const formData = {
      image:images[0]|| "",
      title: document.getElementById('Title').value || "", 
      price: document.getElementById('Price').value || 0,
      author_id: user.id,  
      author: user.name,
      description: document.getElementById('Description').value ||  document.getElementById('Description1').value ,
      longitude: markerPosition[1], 
      latitude: markerPosition[0], 
      images: [images[0], ...images.slice(1).filter(image => image !== null)],  
      country: document.getElementById('Country').value || "", 
      city: document.getElementById('City').value || "", 
      currency:currency.toString(),
      serviceType:typeOfService.toString(),
      paymentMethod:paymentMethod.toString(),
      roomNumber:roomNumber.toString(),
      kvmAmount:document.getElementById('Kv_M').value || "",
      typeOfHome:typeOfHome.toString(),
    };

    try {
      const response = await fetch("https://api.nextflat.my/apartments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Data submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
   window.location.reload(); 

  };

  const [apartmentData, setApartmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchApartmentData = async () => {
      try {
  
        const userResponse = await fetch(`https://api.nextflat.my/users/${user.id}`, {
          method: 'GET', 
        });
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await userResponse.json();
  
        const apartmentsId = userData.apartment_ids;

        const apartmentDataPromises = apartmentsId.map(async (apartmentId) => {
          const apartmentResponse = await fetch(`https://api.nextflat.my/apartments/${apartmentId}`, {
            method: 'GET', 
          });
          if (!apartmentResponse.ok) {
            throw new Error(`Failed to fetch apartment with id: ${apartmentId}`);
          }
          return apartmentResponse.json();
        });
  
    
        const apartmentsData = await Promise.all(apartmentDataPromises);
  
     
        const formattedData = apartmentsData.map(apartment => ({
          Title: apartment.title,  
          Id: apartment.id,       
          Price: apartment.price, 
          Curency: apartment.currency
        }));
  
       
        setApartmentData(formattedData);
        setLoading(false);
  
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchApartmentData();
  }, [user.id]);
  
  
  const handleDelete = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null; 
    setImages(updatedImages);
  };
  
  return (
    <div className={styles.mainC}>
      <div className={styles.mainB}>
        <div className={styles.headerContainer}>
          <div className={styles.heder}>
            <img
              src={hederImg}
              alt="Next Flat"
              className={styles.animated_image}
              onClick={homereturn}
            />
          </div>
          <hr className={styles.bottomHR} />
        </div>
        <div className={styles.top}>
          <button
            className={styles.backbtn}
            onClick={() => navigate("/")}
          >
            <img className={styles.backIco} alt="" src={backIco} />
            {t("Back")}
          </button>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.Btop}>
          <label className={styles.tableLabel}>{t("My announcements")}</label>
          <div className={styles.tableDiv}>
            <AccessibleTable rows={apartmentData} />
          </div>
        </div>
        <hr/>
        <div className={styles.bottom2}>
         <label className={styles.tableLabel}>{t("Add new announcement")}</label>
          <div className={styles.bottom}>
          <ThemeProvider theme={theme}>
            <div className={styles.bottomtexts}>
              <div className={styles.textboxes}>
                <TextField id="Title" name="Title" label={t("Title")} />
                <TextField id="Price" name="Price" label={t("Price")} />
                <TextField id="Town" name="Town" label={t("Town")} />
                <div className={styles.selectBoxes}>
                <FormControl fullWidth>
        <InputLabel  id="demo-simple-select-label"  sx={{
      color: 'goldenrod',  '&.Mui-focused': {
        color: 'goldenrod',
      },
    }}>{t("Deal type")}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={typeOfService}
          label={t("Deal type")}
          onChange={handleserviceTypeChange}
          sx={{
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'goldenrod', 
            },
            '& .MuiSelect-icon': {
              color: 'goldenrod',
            },
          }}
        >
          <MenuItem value={"Sale"}>{t("Sale")}</MenuItem>
          <MenuItem value={"Rental"}>{t("Rental")}</MenuItem>
        </Select>
                </FormControl>
                <FormControl fullWidth>
        <InputLabel  id="demo-simple-select-label"  sx={{
      color: 'goldenrod',  '&.Mui-focused': {
        color: 'goldenrod',
      },
    }}>{t("Rooms")}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={roomNumber}
          label={t("Rooms")}
          onChange={handlesetsetroomNumber}
          sx={{
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'goldenrod', 
            },
            '& .MuiSelect-icon': {
              color: 'goldenrod',
            },
          }}
        >
          <MenuItem value={"1"}>1</MenuItem>
          <MenuItem value={"2"}>2</MenuItem>
          <MenuItem value={"3"}>3</MenuItem>
          <MenuItem value={"4"}>4</MenuItem>
          <MenuItem value={"5"}>5</MenuItem>
          <MenuItem value={"6"}>6</MenuItem>
          <MenuItem value={"7"}>7</MenuItem>
          <MenuItem value={"8"}>8</MenuItem>
          <MenuItem value={"9"}>9</MenuItem>
          <MenuItem value={"10"}>10</MenuItem>
          <MenuItem value={"10+"}>10+</MenuItem>
        </Select>
                </FormControl>
                </div>
              </div>
              <div className={styles.textboxes}>
                <TextField id="Country" name="Country" label={t("Country")} />
                <TextField id="City" name="City" label={t("City")} />
                <TextField id="Street" name="Street" label={t("Street")} />
                <div className={styles.selectBoxes}>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"  sx={{
      color: 'goldenrod',  '&.Mui-focused': {
        color: 'goldenrod',
      },
    }}>{t("Currency")}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          label={t("Currency")}
          onChange={handleCurrencyChange}
          sx={{
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'goldenrod', 
            },
            '& .MuiSelect-icon': {
              color: 'goldenrod',
            },
          }}
        >
          <MenuItem value={"AZN"}>AZN</MenuItem>
          <MenuItem value={"USD"}>USD</MenuItem>
        </Select>
                </FormControl>
                <FormControl fullWidth>
        <InputLabel  id="demo-simple-select-label"  sx={{
      color: 'goldenrod',  '&.Mui-focused': {
        color: 'goldenrod',
      },
    }}>{t("Home type")}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={typeOfHome}
          label={t("Home type")}
          onChange={handlesetTypeOfHome}
          sx={{
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'goldenrod', 
            },
            '& .MuiSelect-icon': {
              color: 'goldenrod',
            },
          }}
        >
          <MenuItem value={"studio"}>{t("Studio")}</MenuItem>
          <MenuItem value={"duplex"}>{t("Duplex")}</MenuItem>
          <MenuItem value={"penthouse"}>{t("Penthouse")}</MenuItem>
          <MenuItem value={"family"}>{t("Family")}</MenuItem>
          <MenuItem value={"loft"}>{t("Loft")}</MenuItem>
          <MenuItem value={"attic"}>{t("Attic")}</MenuItem>
        </Select>
                </FormControl>
                </div>
              </div>
              <div className={styles.textboxes1}>
                <TextField id="Kv_M" name="Kv_M" label={t("Kv M")} />     
                <TextField  id="Flour" name="Flour" label={t("Flour")}  />
  
                
  
                <TextField
                  className={styles.DescriptionLabel}
                  id="Description"
                  name="Description"
                  label={t("Description")}
                />

                <FormControl   className={styles.RentalInfo}  fullWidth>
        <InputLabel id="demo-simple-select-label"   sx={{
      color: 'goldenrod', '&.Mui-focused': {
        color: 'goldenrod',
      },
    }}>{t("Payment method")}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={paymentMethod}
          label={t("Payment method")}
          onChange={handlepaymentMethod}
          sx={{
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'goldenrod', 
            },
            '& .MuiSelect-icon': {
              color: 'goldenrod',
            },
          }}
        >
          <MenuItem value={"Monthly"}>{t("Monthly")}</MenuItem>
          <MenuItem value={"Yearly"}>{t("Yearly")}</MenuItem>
          <MenuItem value={"One time"}>{t("One time")}</MenuItem>
          <MenuItem value={"All possible"}>{t("All possible")}</MenuItem>
        </Select>
                </FormControl>

        
                
              
              </div>
              <div className={styles.textboxes12}>
              
                <TextField
                  className={styles.DescriptionLabel1}
                  id="Description1"
                  name="Description"
                  label={t("Description")}
                />

                <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label"   sx={{
      color: 'goldenrod', '&.Mui-focused': {
        color: 'goldenrod',
      },
    }}>{t("Payment method")}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={paymentMethod}
          label={t("Payment method")}
          onChange={handlepaymentMethod}
          sx={{
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'goldenrod', 
            },
            '& .MuiSelect-icon': {
              color: 'goldenrod',
            },
          }}
        >
           <MenuItem value={"Monthly"}>{t("Monthly")}</MenuItem>
          <MenuItem value={"Yearly"}>{t("Yearly")}</MenuItem>
          <MenuItem value={"One time"}>{t("One time")}</MenuItem>
          <MenuItem value={"All possible"}>{t("All possible")}</MenuItem>
        </Select>
                </FormControl>
     
              </div>
            </div>
            
          </ThemeProvider>
          <hr className={styles.verticalline} />
          <div className={styles.container}>
            {images.map((image, index) => (
              <div
                key={index}
                className={`${styles.box} ${image ? styles.withImage : ''}`}
                style={image ? { backgroundImage: `url(${image})` } : {}}
              >
                 {image && (
            <button
              onClick={() => handleDelete(index)}
              className={styles.deleteButton}
            >
              <i class="bi bi-trash3-fill"></i>
            </button>
          )}

                {!image && (
                  <label className={styles.label}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(index, e)}
                      className={styles.input}
                      key={index}
                    />
                    <span className={styles.plus}>+</span>
                  </label>
                )}
              </div>
            ))}
          </div>


          <hr className={styles.verticalline} />
          <div className={styles.mapContainer}>
            <MapContainer
              center={center}
              zoom={13}
              style={{ width: "100%", height: "100%" }}
              maxBounds={[
                [85, -180],
                [-85, 180],
              ]}
              maxBoundsViscosity={1.0}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; Uğur Sadıxlı"
              />
              <Marker position={markerPosition}>
                <Popup>{t("You are here")}</Popup>
              </Marker>
              <MapUpdater newCenter={center} />
            </MapContainer>
          </div>
          </div>
        </div>
      </div>
      <button className={styles.SubmitButton} onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddAnnouncements;
