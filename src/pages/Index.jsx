import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Select, Text, VStack, HStack, IconButton, Textarea, Heading, Divider } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [contentTypes, setContentTypes] = useState([]);
  const [contentInstances, setContentInstances] = useState([]);
  const [contentAttributes, setContentAttributes] = useState([]);
  const [relationships, setRelationships] = useState([]);

  const [newContentType, setNewContentType] = useState("");
  const [newContentInstance, setNewContentInstance] = useState({
    type: "",
    attributes: {},
  });
  const [newContentAttribute, setNewContentAttribute] = useState({
    type: "",
    name: "",
  });
  const [newRelationship, setNewRelationship] = useState({
    source: "",
    target: "",
    data: {},
  });

  const handleCreateContentType = () => {
    if (newContentType.trim() !== "") {
      setContentTypes([...contentTypes, newContentType.trim()]);
      setNewContentType("");
    }
  };

  const handleCreateContentInstance = () => {
    if (newContentInstance.type !== "") {
      setContentInstances([...contentInstances, newContentInstance]);
      setNewContentInstance({ type: "", attributes: {} });
    }
  };

  const handleCreateContentAttribute = () => {
    if (newContentAttribute.type !== "" && newContentAttribute.name.trim() !== "") {
      setContentAttributes([...contentAttributes, newContentAttribute]);
      setNewContentAttribute({ type: "", name: "" });
    }
  };

  const handleCreateRelationship = () => {
    if (newRelationship.source !== "" && newRelationship.target !== "") {
      setRelationships([...relationships, newRelationship]);
      setNewRelationship({ source: "", target: "", data: {} });
    }
  };

  const handleDeleteContentType = (index) => {
    setContentTypes(contentTypes.filter((_, i) => i !== index));
  };

  const handleDeleteContentInstance = (index) => {
    setContentInstances(contentInstances.filter((_, i) => i !== index));
  };

  const handleDeleteContentAttribute = (index) => {
    setContentAttributes(contentAttributes.filter((_, i) => i !== index));
  };

  const handleDeleteRelationship = (index) => {
    setRelationships(relationships.filter((_, i) => i !== index));
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        CRUD Interface
      </Heading>

      <VStack align="stretch" spacing={8}>
        {/* Content Types */}
        <Box>
          <Heading as="h2" size="lg" mb={2}>
            Content Types
          </Heading>
          <FormControl id="newContentType" mb={2}>
            <FormLabel>New Content Type</FormLabel>
            <HStack>
              <Input value={newContentType} onChange={(e) => setNewContentType(e.target.value)} placeholder="Enter content type" />
              <IconButton icon={<FaPlus />} onClick={handleCreateContentType} aria-label="Create Content Type" />
            </HStack>
          </FormControl>
          {contentTypes.map((contentType, index) => (
            <HStack key={index} mb={2}>
              <Text>{contentType}</Text>
              <IconButton icon={<FaTrash />} onClick={() => handleDeleteContentType(index)} aria-label="Delete Content Type" />
            </HStack>
          ))}
        </Box>

        <Divider />

        {/* Content Instances */}
        <Box>
          <Heading as="h2" size="lg" mb={2}>
            Content Instances
          </Heading>
          <FormControl id="newContentInstance" mb={2}>
            <FormLabel>New Content Instance</FormLabel>
            <VStack align="stretch">
              <Select
                value={newContentInstance.type}
                onChange={(e) =>
                  setNewContentInstance({
                    ...newContentInstance,
                    type: e.target.value,
                  })
                }
                placeholder="Select content type"
              >
                {contentTypes.map((contentType, index) => (
                  <option key={index} value={contentType}>
                    {contentType}
                  </option>
                ))}
              </Select>
              <Textarea
                value={JSON.stringify(newContentInstance.attributes, null, 2)}
                onChange={(e) =>
                  setNewContentInstance({
                    ...newContentInstance,
                    attributes: JSON.parse(e.target.value),
                  })
                }
                placeholder="Enter attributes (JSON)"
              />
              <Button onClick={handleCreateContentInstance}>Create Content Instance</Button>
            </VStack>
          </FormControl>
          {contentInstances.map((contentInstance, index) => (
            <Box key={index} mb={2} p={2} borderWidth={1} borderRadius="md">
              <HStack justify="space-between">
                <Text fontWeight="bold">{contentInstance.type}</Text>
                <IconButton icon={<FaTrash />} onClick={() => handleDeleteContentInstance(index)} aria-label="Delete Content Instance" />
              </HStack>
              <Text>{JSON.stringify(contentInstance.attributes, null, 2)}</Text>
            </Box>
          ))}
        </Box>

        <Divider />

        {/* Content Attributes */}
        <Box>
          <Heading as="h2" size="lg" mb={2}>
            Content Attributes
          </Heading>
          <FormControl id="newContentAttribute" mb={2}>
            <FormLabel>New Content Attribute</FormLabel>
            <VStack align="stretch">
              <Select
                value={newContentAttribute.type}
                onChange={(e) =>
                  setNewContentAttribute({
                    ...newContentAttribute,
                    type: e.target.value,
                  })
                }
                placeholder="Select content type"
              >
                {contentTypes.map((contentType, index) => (
                  <option key={index} value={contentType}>
                    {contentType}
                  </option>
                ))}
              </Select>
              <Input
                value={newContentAttribute.name}
                onChange={(e) =>
                  setNewContentAttribute({
                    ...newContentAttribute,
                    name: e.target.value,
                  })
                }
                placeholder="Enter attribute name"
              />
              <Button onClick={handleCreateContentAttribute}>Create Content Attribute</Button>
            </VStack>
          </FormControl>
          {contentAttributes.map((contentAttribute, index) => (
            <HStack key={index} mb={2}>
              <Text>
                {contentAttribute.type}.{contentAttribute.name}
              </Text>
              <IconButton icon={<FaTrash />} onClick={() => handleDeleteContentAttribute(index)} aria-label="Delete Content Attribute" />
            </HStack>
          ))}
        </Box>

        <Divider />

        {/* Relationships */}
        <Box>
          <Heading as="h2" size="lg" mb={2}>
            Relationships
          </Heading>
          <FormControl id="newRelationship" mb={2}>
            <FormLabel>New Relationship</FormLabel>
            <VStack align="stretch">
              <Select
                value={newRelationship.source}
                onChange={(e) =>
                  setNewRelationship({
                    ...newRelationship,
                    source: e.target.value,
                  })
                }
                placeholder="Select source instance"
              >
                {contentInstances.map((contentInstance, index) => (
                  <option key={index} value={index}>
                    {contentInstance.type} - {index}
                  </option>
                ))}
              </Select>
              <Select
                value={newRelationship.target}
                onChange={(e) =>
                  setNewRelationship({
                    ...newRelationship,
                    target: e.target.value,
                  })
                }
                placeholder="Select target instance"
              >
                {contentInstances.map((contentInstance, index) => (
                  <option key={index} value={index}>
                    {contentInstance.type} - {index}
                  </option>
                ))}
              </Select>
              <Textarea
                value={JSON.stringify(newRelationship.data, null, 2)}
                onChange={(e) =>
                  setNewRelationship({
                    ...newRelationship,
                    data: JSON.parse(e.target.value),
                  })
                }
                placeholder="Enter relationship data (JSON)"
              />
              <Button onClick={handleCreateRelationship}>Create Relationship</Button>
            </VStack>
          </FormControl>
          {relationships.map((relationship, index) => (
            <Box key={index} mb={2} p={2} borderWidth={1} borderRadius="md">
              <HStack justify="space-between">
                <Text fontWeight="bold">
                  {contentInstances[relationship.source].type} - {contentInstances[relationship.target].type}
                </Text>
                <IconButton icon={<FaTrash />} onClick={() => handleDeleteRelationship(index)} aria-label="Delete Relationship" />
              </HStack>
              <Text>{JSON.stringify(relationship.data, null, 2)}</Text>
            </Box>
          ))}
        </Box>
      </VStack>
    </Box>
  );
};

export default Index;
