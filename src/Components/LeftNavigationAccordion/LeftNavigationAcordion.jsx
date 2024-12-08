import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";

export const LeftNavigationAccordion = ({ category, key }) => {
  console.log(category);

  return (
    <Accordion
      key={key}
      sx={{ backgroundColor: "transparent" }}
      //   expandIcon={<ExpandMoreIcon />}
    >
      <AccordionSummary>
        <Typography variant="list">{category.category.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          paddingLeft={2}
          display={"flex"}
          flexDirection={"column"}
          component="ul"
        >
          {category.types.map((type) => (
            <Box
              key={type._id}
              borderBottom={"1px solid white"}
              paddingBottom={2}
              paddingTop={2}
              component="li"
            >
              <Link
                href={{
                  pathname: `/itemsList`,
                  query: {
                    category: category.category._id,
                    type: type._id,
                  },
                }}
              >
                <Typography variant="list2">{type.name}</Typography>
              </Link>
            </Box>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
