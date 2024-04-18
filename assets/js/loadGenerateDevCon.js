function generateDevContainerJSON() {
    const name = document.getElementById('nameField').value;
    const workspaceFolder = document.getElementById('workspaceField').value;
    const cpus = document.getElementById('cpuSelector').value;
    const extensions = Array.from(document.getElementById('extensionSelector').selectedOptions).map(opt => opt.value);
    const ports = document.getElementById('ports').value.split(',').map(port => port.trim());
    const updateContentCommand = document.getElementById('updateContentCommand').value;
    const postCreateCommand = document.getElementById('postCreateCommand').value;
    const postStartCommand = document.getElementById('postStartCommand').value;
    // Prepend the text to the selected image value
    const baseImageURL = "ghcr.io/nmfs-opensci/";
    const selectedImage = document.getElementById('packageSelector').value;
    const image = baseImageURL + selectedImage;
    const devContainerConfig = {
        "name": name,
        "workspaceFolder": workspaceFolder,
        "image": image,
        "hostRequirements": {
            "cpus": parseInt(cpus)
        },
        "forwardPorts": ports.map(Number),
        "portsAttributes": {},
        "customizations": {
            "vscode": {
                "extensions": extensions
            }
        },
        "updateContentCommand": updateContentCommand,
        "postCreateCommand": postCreateCommand,
        "postStartCommand": postStartCommand
    };

    // Populate port attributes using the image name as the label
    ports.forEach(port => {
        devContainerConfig.portsAttributes[port] = {
            "label": image,
            "onAutoForward": "openPreview"
        };
    });

    // Output the JSON configuration in a formatted way
    globalJSON = JSON.stringify(devContainerConfig, null, 2);
    document.getElementById('output').textContent = JSON.stringify(devContainerConfig, null, 2);
    document.getElementById('downloadBtn').style.display = 'inline-block'; 
}